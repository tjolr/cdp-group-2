import * as GoogleSignIn from 'expo-google-sign-in';

export namespace API {
  export const initGoogleAuth = async () => {
    // In order for this to work, the firebase googleServiceFile in app.json must be configured
    // The file can be found under project settings in the firebase console
    await GoogleSignIn.initAsync();
    syncUserWithStateAsync();
  };

  export const googleSignIn = async () => {
    await GoogleSignIn.askForPlayServicesAsync().catch(() => {
      return new Error('Failed to communicate with play services');
    });

    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === 'success') {
      syncUserWithStateAsync();
      return user;
    }
    return new Error('Failed to sign in');
  };

  export const googleSignOut = async () => {
    await GoogleSignIn.signOutAsync();
  };

  export const getCurrentGoogleUser = () => {
    return GoogleSignIn.getCurrentUser();
  };
}

const syncUserWithStateAsync = async () => {
  await GoogleSignIn.signInSilentlyAsync();
};
