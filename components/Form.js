import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FormError = function ({ errorMessage }) {
  return <p className="text-red-100 mt-1">{errorMessage}</p>;
};

const Form = function ({ onSubmit, onCancel, onDelete, selectedContact }) {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    formState: { isSubmitSuccessful },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (selectedContact) {
      setValue("firstName", selectedContact.firstName);
      setValue("lastName", selectedContact.lastName);
      setValue("phone", selectedContact.phone);
      setValue("email", selectedContact.email);
    }
    if (formState.isSubmitSuccessful) {
      reset({ firstName: "", lastName: "", phone: "", email: "" });
    }
  }, [selectedContact, formState]);

  const handleCancelButton = (e) => {
    e.preventDefault();
    reset({ firstName: "", lastName: "", phone: "", email: "" });
    onCancel();
  };

  const handleDeleteButton = () => {
    reset({ firstName: "", lastName: "", phone: "", email: "" });
    onDelete();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col px-3 mb-2">
          <label className="pb-1">First Name</label>
          <input type="text" name="firstName" {...register("firstName", { required: true })} className="px-2 py-1" />
          {errors.firstName && <FormError errorMessage="First name is required" />}
        </div>
        <div className="flex flex-col px-3 mb-2">
          <label className="pb-1">Last Name</label>
          <input type="text" name="lastName" {...register("lastName")} className="px-2 py-1" />
        </div>
        <div className="flex flex-col px-3 mb-2">
          <label className="pb-1">Phone number</label>
          <input type="text" name="phone" {...register("phone")} className="px-2 py-1" />
        </div>
        <div className="flex flex-col px-3 mb-2">
          <label className="pb-1">E-mail</label>
          <input type="text" name="email" {...register("email")} className="px-2 py-1" />
        </div>
        <div className="mb-2 flex flex-row gap-x-2 justify-between px-3">
          <button type="submit" className="bg-slate-100 py-2 flex-1">
            {selectedContact ? "Update Contact" : "Add Contact"}
          </button>
          {selectedContact && (
            <button onClick={handleCancelButton} className="bg-red-100 flex-1">
              Cancel
            </button>
          )}
        </div>
      </form>
      {selectedContact && (
        <div className="mt-5 mb-2 flex flex-col px-3">
          <button className="bg-red-300 text-red-900 py-2 flex-1" onClick={handleDeleteButton}>
            Delete Contact
          </button>
        </div>
      )}
    </>
  );
};

export default Form;
