# Node.js Backend Developer Test Assignment

## Overview
Implement a service with API for scheduling doctor appointments and sending reminders 2 hours before the appointment.

## Database Structure

### Users Collection
```json
{
    "id": "uuid",
    "phone": "+1 234 567 8901",
    "name": "John Doe",
    "...anything": "additional fields"
}
```

### Doctors Collection
```json
{
    "id": "uuid",
    "name": "John Smith",
    "spec": "Therapist",
    "slots": ["date_time", "date_time"],
    "...anything": "additional fields"
}
```

## API Endpoints

### Schedule Appointment
Schedule a new appointment by providing:
```json
{
    "user_id": "askd90pajsdpojas",    
    "doctor_id": "a987astgydioaushd9a0sdhy",
    "slot": "date_time",
    "...anything": "additional fields"
}
```

**Requirements:**
- Single booking per slot
- Error response for unavailable time slots

## Notification Service

The service sends reminders:
- 1 day before appointment
- 2 hours before appointment

Notifications are logged to a .log file in the format:
```
{{ current_date }} | Hello {{ user.name }}! Reminder: you have an appointment with {{ doctor.spec }} tomorrow at {{ slot.time }}!
{{ current_date }} | Hello {{ user.name }}! Reminder: you have an appointment with {{ doctor.spec }} in 2 hours at {{ slot.time }}!
```

## Technical Requirements

### Installation
```bash
pnpm i && pnpm build && pnpm start
```

## Tech Stack
- Fastify
- MongoDB
- Mongoose

## Architecture
This project implements Onion Architecture (Clean Architecture) with the following layers:

1. **Core Domain Layer**
   - Entities
   - Value Objects
   - Domain Services

2. **Application Service Layer**
   - Use Cases
   - Application Services
   - DTOs

3. **Infrastructure Layer**
   - Repositories
   - External Services
   - Database Implementation

4. **Interface Layer**
   - Controllers
   - Routes
   - API Models

This architecture ensures:
- Separation of concerns
- Business logic independence
- High testability
- Maintainable codebase
- Scalable structure
