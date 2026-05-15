# Security Specification for Firestore

## Data Invariants
1. A user can only read and write their own profile document.
2. A user can only read and write their own custom hospitals.
3. User profile data must have all required fields.
4. Timestamps must be handled on the server.
5. `userId` in the path must match `request.auth.uid`.

## The "Dirty Dozen" Payloads

1. **Identity Spoofing**: Attempt to update another user's profile.
   - Path: `/users/other-user-id/profile/medical`
   - Payload: `{ "name": "Hacker" }`
   - Expected: `PERMISSION_DENIED`

2. **Required Field Omission**: Create a profile without a blood group.
   - Path: `/users/{uid}/profile/medical`
   - Payload: `{ "name": "John", "phone": "123", "emergencyContact": "Jane", "emergencyPhone": "456" }`
   - Expected: `PERMISSION_DENIED` (missing `bloodGroup`)

3. **Malformed ID**: Use a 2KB string as a hospital ID.
   - Path: `/users/{uid}/hospitals/very-long-id...`
   - Expected: `PERMISSION_DENIED`

4. **Shadow Field Injection**: Add `isAdmin: true` to profile.
   - Payload: `{ "name": "John", ..., "isAdmin": true }`
   - Expected: `PERMISSION_DENIED`

5. **Type Poisoning**: Set `lat` to a string.
   - Payload: `{ "name": "Hosp", "lat": "invalid" }`
   - Expected: `PERMISSION_DENIED`

6. **Boundary Violation**: Set `rating` to 10.
   - Payload: `{ "name": "Hosp", "rating": 10 }`
   - Expected: `PERMISSION_DENIED`

7. **PII Blanket Read**: Attempt to list all users' profiles.
   - Operation: `list /users/{any}/profile`
   - Expected: `PERMISSION_DENIED`

8. **Cross-User Injection**: A user tries to delete another's hospital.
   - Path: `/users/other-user/hospitals/h1`
   - Expected: `PERMISSION_DENIED`

9. **Timestamp Spoofing**: Provide a future `updatedAt` from client.
   - Expected: `PERMISSION_DENIED`

10. **Array Explosion**: Try to add 1 million specialties.
    - Expected: `PERMISSION_DENIED`

11. **Negative Coordinate**: Set `lat` outside [-90, 90].
    - Expected: `PERMISSION_DENIED`

12. **Empty Name**: Save a hospital with an empty string name.
    - Expected: `PERMISSION_DENIED`
