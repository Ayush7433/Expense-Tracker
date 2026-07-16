# Implement Profile Image Upload

This document outlines the end-to-end plan for adding avatar upload functionality to user profiles. 

## Proposed Changes

### Backend Setup & Dependencies
- **Dependencies**: Install `multer` in the `server` directory to handle `multipart/form-data` uploads.
- **Static Serving**: Update `server.js` to serve static files from the `server/uploads` directory (e.g. `app.use('/uploads', express.static(path.join(__dirname, 'uploads')));`).

### Database Model
#### [MODIFY] [User.js](file:///d:/Projects/Expence-Tracker/server/models/User.js)
- Add a new `avatarUrl` field (Type: `String`, `default: ""`) to the user schema to store the relative path of the uploaded image.

### Backend Routes & Controllers
#### [NEW] `server/routes/userRoutes.js` (or modifying `authRoutes.js`)
- Add a new protected `POST` route: `/api/users/avatar`.
#### [NEW] `server/controllers/userController.js`
- Create an `uploadAvatar` controller.
- Configure `multer` storage to save files locally to `server/uploads/avatars/`.
- Validate file types (only accept `jpg`, `jpeg`, `png`, `webp`).
- Limit file size to 2MB or 5MB.
- After a successful upload, update the `User` document in MongoDB with the generated file path and return the updated user object.

### Frontend Integration
#### [MODIFY] [authApi.js](file:///d:/Projects/Expence-Tracker/client/src/redux/services/authApi.js)
- Add a new `uploadAvatarApi` function that sends a `FormData` object containing the file to the backend using a `POST` request.
#### [MODIFY] [authSlice.js](file:///d:/Projects/Expence-Tracker/client/src/redux/slices/authSlice.js)
- Add an action to seamlessly update the `user` object in the Redux state with the new `avatarUrl` after a successful upload.

### Frontend UI
#### [MODIFY] [ProfileCard.jsx](file:///d:/Projects/Expence-Tracker/client/src/components/profile/ProfileCard.jsx)
- Transform the existing initial/avatar circle into an interactive element.
- Add a hidden `<input type="file" accept="image/*" />`.
- Add an `onChange` handler to read the selected file and render a live preview.
- Call the `uploadAvatarApi` immediately upon selection (or add an "Upload" button).
- Implement a loading state (e.g., a spinner overlaying the avatar) while the file uploads.

### Git Configuration
#### [MODIFY] [.gitignore](file:///d:/Projects/Expence-Tracker/.gitignore)
- Explicitly add `server/uploads/` and `client/public/uploads/` to `.gitignore` to ensure user-uploaded content is not tracked in git (Note: `uploads/` is currently in the file, but we will ensure the exact path is explicitly ignored).

## Open Questions
> [!IMPORTANT]
> 1. Do you want the avatar to be uploaded immediately when the user selects a file, or do you want a separate "Save" button?
> 2. What is the maximum file size you'd like to permit for images (e.g., 2MB, 5MB)?

## Verification Plan
1. Send a test image via the UI and verify it uploads successfully.
2. Verify the `User` document in MongoDB is updated with the correct `avatarUrl`.
3. Ensure the image persists and displays correctly upon page refresh.
4. Verify the `server/uploads` folder is successfully ignored by Git.
