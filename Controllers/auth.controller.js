
export const registration = async (req , res) => {
  return await res.render("auth/register");
}
export const getLogin = async (req , res) => {
 return await res.render("auth/login");
}