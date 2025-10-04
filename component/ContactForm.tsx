"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import { sendContactForm } from "@/lib/api";
import { useState } from "react";

// ✅ Zod schema
const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const resData = {
        name: data.fullName,
        email: data.email,
        message: data.message,
        subject: data.subject,
        phone: data.phone,
      };
      const res = await sendContactForm(resData);
      if (res) {
        setResultMessage("Message sent successfully!");
        setIsSuccess(true);
      } else {
        setResultMessage("Something went wrong!");
        setIsSuccess(false);
      }
      setTimeout(() => {
        setResultMessage("");
      }, 2000);
    } catch (err) {
      setResultMessage("Something went wrong!");
      setIsSuccess(false);
      setTimeout(() => {
        setResultMessage("");
        setIsSuccess(false);
      }, 2000);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
      <div className=" grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <div className=" col-span-1 ">
          <FormField<ContactFormData>
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
            register={register}
            errors={errors}
            isrequired
          />
        </div>
        <div className=" col-span-1">
          <FormField<ContactFormData>
            label="Email"
            name="email"
            type="email"
            placeholder="example@email.com"
            register={register}
            errors={errors}
            isrequired
          />
        </div>
        <div className=" col-span-1">
          <FormField<ContactFormData>
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+66 123 456 789"
            register={register}
            errors={errors}
            isrequired
          />
        </div>
        <div className=" col-span-1">
          <FormField<ContactFormData>
            label="Subject"
            name="subject"
            placeholder="Project inquiry"
            register={register}
            errors={errors}
            isrequired
          />
        </div>

        <div className="lg:col-span-2 col-span-1">
          <FormField<ContactFormData>
            label="Message"
            name="message"
            textarea
            placeholder="Write your message here..."
            register={register}
            errors={errors}
            isrequired
          />
        </div>
      </div>
      {resultMessage !== "" && (
        <p
          className={`text-sm ${
            isSuccess ? "text-green-500" : "text-red-500"
          } mb-3 font-bold`}
        >
          {resultMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className={` text-white py-2 px-4 rounded-lg font-medium ${
          loading
            ? "cursor-not-allowed bg-gray-300"
            : "cursor-pointer bg-[#8B5CF6] hover:bg-[#8B5CF6]/80"
        }`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
