import URLS from "./url";
import services from "./services";

const signIn = (phone, password) => {
  const data = {
    phone,
    password,
  };
  return services.public.post(URLS.MAIN, URLS.ACCOUNT.LOGIN, data);
};

const signUp = (phone, password, first_name, last_name, is_developer) => {
  const data = {
    phone,
    first_name,
    last_name,
    password,
    is_developer,
  };
  return services.public.post(URLS.MAIN, URLS.ACCOUNT.REGISTER, data);
};

const profile = () => {
  return services.private.get(URLS.MAIN, URLS.ACCOUNT.PROFILE);
};
const applications = () => {
  return services.private.get(URLS.MAIN, URLS.STORE.APPLICATION);
};

const application = (applicationId) => {
  return services.private.get(
    URLS.MAIN,
    URLS.STORE.APPLICATION + "/" + applicationId,
  );
};

const addApplication = (formData) => {
  return services.private.formData(
    URLS.MAIN + URLS.STORE.APPLICATION,
    formData,
  );
};
const getComments = (id) => {
  const data = { application: id };
  return services.private.get(URLS.MAIN, URLS.STORE.COMMENT, data);
};
const sendComment = (id, text) => {
  const data = { application: id, text };
  return services.private.post(URLS.MAIN, URLS.STORE.COMMENT, data);
};

const apis = {
  signIn,
  signUp,
  profile,
  applications,
  application,
  addApplication,
  getComments,
  sendComment,
};

export default apis;
