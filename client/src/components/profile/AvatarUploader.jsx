import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Camera, Loader2 } from "lucide-react";
import { uploadAvatarApi } from "../../redux/services/authApi";
import { updateUser } from "../../redux/slices/authSlice";
import UserAvatar from "../common/UserAvatar";

const AvatarUploader = ({ user }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const name = user?.name || "";
  const initial = name.charAt(0).toUpperCase() || "U";

  // The backend now provides an absolute ImageKit URL
  const avatarUrl = user?.avatarUrl || null;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await uploadAvatarApi(formData);

      if (response.success) {
        dispatch(updateUser(response.user));
        toast.success("Profile picture updated!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Avatar</h3>
      <p className="mt-1 text-sm text-slate-500">
        Click on the camera icon to upload a new profile picture.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative group">
          <UserAvatar
            avatarUrl={avatarUrl}
            name={name}
            className="h-20 w-20 text-3xl shadow-lg shadow-blue-200"
          />

          <button
            onClick={handleCameraClick}
            disabled={isUploading}
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-white shadow-md transition hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
            title="Upload Photo"
          >
            {isUploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Camera size={14} />
            )}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />
        </div>

        <div>
          <p className="font-medium text-slate-900">{name || "User"}</p>
          <p className="mt-1 text-sm text-slate-500">
            {avatarUrl ? "Custom profile picture" : "Avatar generated from your name initial."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvatarUploader;