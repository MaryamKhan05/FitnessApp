import { auth } from "../FirebaseConfig";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import { firebase } from "../FirebaseConfig";

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

// export const updateEmailFunction =  (newEmail) => {
//   const user = auth.currentUser;
//   console.log(newEmail,user)
//   return updateEmail(user, newEmail)
//     .then(() => {
//       console.log("Email updated successfully");
//       alert("Email updated successfully");
//     })
//     .catch((error) => {
//       console.error("Error updating email:", error);
//       alert("Error updating email: " + error.message);
//     });
// };

// export const updateEmailFunction = (newEmail) => {
//   const user = auth.currentUser;

//   // Send a verification email to the new email address
//   sendEmailVerification(user)
//     .then(() => {
//       console.log("Verification email sent to the new email address");
//       alert("Verification email sent to the new email address");
//     })
//     .catch((error) => {
//       console.error("Error sending verification email:", error);
//       alert("Error sending verification email: " + error.message);
//     });
// };

export const handleResetPassword = async (email) => {
  const trimmedEmail = email.trim(); 

  if (!trimmedEmail) {
    alert("Please enter a valid email address");
    return;
  }
  await sendPasswordResetEmail(auth, trimmedEmail)
    .then(() => {
      alert("Mail Sent To Your Email", trimmedEmail);
    })
    .catch((error) => {
      alert("Error sending password reset email:", error);
    });
};
