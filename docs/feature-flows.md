# Feature Flow Diagrams

This document captures user-facing feature flows and the main application modules involved in each flow.

## Create Ticket

The create ticket flow starts on the tickets route, where the page renders the ticket creation form above the existing ticket list.

```mermaid
flowchart TD
  A[User opens /tickets] --> B[TicketsPage renders Create Ticket card]
  B --> C[TicketUpsertForm initializes useActionState]
  C --> D[User enters title, content, deadline, and bounty]
  D --> E[User submits the form]
  E --> F[upsertTicket server action receives FormData]
  F --> G{Form data passes Zod validation?}
  G -- No --> H[fromErrorToActionState returns ERROR state]
  H --> I[Form shows field errors and error toast]
  I --> D
  G -- Yes --> J[Convert bounty from dollars to cents]
  J --> K[prisma.ticket.upsert creates Ticket row]
  K --> L[revalidatePath for /tickets]
  L --> M[toActionState returns SUCCESS state]
  M --> N[Form shows success toast and resets date picker]
  N --> O[TicketList reloads tickets ordered newest first]
```

### Main Modules

- Route composition: `src/app/tickets/page.tsx`
- Create form UI: `src/features/ticket/components/ticket-upsert-form.tsx`
- Form feedback wrapper: `src/components/form/form.tsx`
- Server action: `src/features/ticket/actions/upsert-ticket.tsx`
- Database model: `prisma/schema.prisma`
- List refresh query: `src/features/ticket/queries/get-tickets.tsx`

### Validation And Persistence

The server action validates these fields before writing to the database:

- `title`: required string, max 191 characters
- `content`: required string, max 1024 characters
- `deadline`: required `YYYY-MM-DD` string
- `bounty`: required positive number, converted to cents before storage

On validation or persistence error, the server action returns an error action state with the submitted payload, allowing the form to keep the user's input and show field-level errors. On success, the ticket is created with default `OPEN` status, `/tickets` is revalidated, and the user sees a success toast.
