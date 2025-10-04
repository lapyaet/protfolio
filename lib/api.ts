export const sendContactForm = async (data: {
  name: string;
  email: string;
  message: string;
  subject: string;
  phone: string;
}) =>
  fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
