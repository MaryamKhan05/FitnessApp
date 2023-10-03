import { auth } from "../FirebaseConfig";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

const reauthenticate = (currentPassword) => {
  const user = auth.currentUser;
  const credentials = EmailAuthProvider.credential(user.email, currentPassword);

  return reauthenticateWithCredential(user, credentials);
};

export const updatePass = (currentPassword, newPassword) => {
  reauthenticate(currentPassword)
    .then(() => {
      const user = auth.currentUser;
      return updatePassword(user, newPassword);
    })
    .then(() => {
      console.log("Password updated successfully");
      alert("Password updated successfully");
    })
    .catch((error) => {
      console.error("Error updating password:", error);
      alert("Error updating password: " + error.message);
    });
};
