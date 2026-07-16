# Profile Image Upload Tasks

- [ ] **1. Install Backend Dependencies**: Run `npm install multer` in the `server` directory.
- [ ] **2. Update Database Model**: Add `avatarUrl` field to `User.js`.
- [ ] **3. Create User Controller**: Implement `uploadAvatar` function using `multer` with 5MB file limit and validation.
- [ ] **4. Create User Routes**: Set up `/api/users/avatar` endpoint.
- [ ] **5. Update `server.js`**: Serve `/uploads` statically and register `userRoutes`.
- [ ] **6. Update `.gitignore`**: Ensure `server/uploads/` is explicitly ignored.
- [ ] **7. Update Frontend API**: Add `uploadAvatarApi` to `authApi.js`.
- [ ] **8. Update Redux Slice**: Add `updateUser` action to `authSlice.js`.
- [ ] **9. Update ProfileCard UI**: Add file input, upload logic, loading state, and render the avatar image.
- [ ] **10. Verify**: Test upload and build.
