import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";
import { useId } from "react";

import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    number: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Enter in the format 123-45-67")
      .min(9, "Too Short!")
      .max(9, "Too Long!")
      .required("Name is required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({ id: nanoid(), name: values.name, number: values.number })
    );
    actions.resetForm();
  };
  const nameField = useId();
  const numberField = useId();

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.contactForm}>
        <div className={css.divContact}>
          <label htmlFor={nameField}>Name</label>
          <Field type="text" name="name" id={nameField} />
          <ErrorMessage
            className={css.formError}
            name="name"
            component="span"
          />
        </div>
        <div className={css.divContact}>
          <label htmlFor={numberField}>Number</label>
          <Field type="tel" name="number" id={numberField} />
          <ErrorMessage
            className={css.formError}
            name="number"
            component="span"
          />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
