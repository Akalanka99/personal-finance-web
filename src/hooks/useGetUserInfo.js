export const useGetUserInfo = () => {
    const { name, userID, isAuth,provider} =
      JSON.parse(localStorage.getItem("auth")) || {};
  
    return { name, userID, isAuth,provider };
  };