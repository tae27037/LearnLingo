import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { bookingSchema } from "../../utils/validationSchemas";
import { saveTrialBooking } from "../../firebase/db";
import styles from "./BookingModal.module.css";

const REASONS = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const BookingModal = ({ isOpen, onClose, teacher }) => {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      reason: REASONS[0],
    },
  });

  const handleClose = () => {
    setIsSent(false);
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    await saveTrialBooking({
      ...data,
      teacherId: teacher?.id,
      teacherName: `${teacher?.name} ${teacher?.surname}`,
      createdAt: Date.now(),
    });

    setIsSent(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {isSent ? (
        <div className={styles.success}>
          <h2 className={styles.title}>
            Your request has been submitted successfully!
          </h2>

          <p className={styles.subtitle}>
            We will contact you shortly to confirm your trial lesson with{" "}
            {teacher?.name} {teacher?.surname}.
          </p>
        </div>
      ) : (
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.formContent}>
            <h2 className={styles.title}>Book trial lesson</h2>

            <p className={styles.subtitle}>
              Our experienced tutor will assess your current language level,
              discuss your learning goals, and tailor the lesson to your
              specific needs.
            </p>

            {teacher && (
              <div className={styles.teacherInfo}>
                <img
                  src={teacher.avatar_url}
                  alt={teacher.name}
                  className={styles.avatar}
                />

                <div>
                  <p className={styles.teacherLabel}>Your teacher</p>

                  <p className={styles.teacherName}>
                    {teacher.name} {teacher.surname}
                  </p>
                </div>
              </div>
            )}

            <p className={styles.groupTitle}>
              What is your main reason for learning English?
            </p>

            <div className={styles.reasonField}>
              <div className={styles.reasonList}>
                {REASONS.map((reason) => (
                  <label key={reason} className={styles.reasonOption}>
                    <input
                      type="radio"
                      value={reason}
                      {...register("reason")}
                    />

                    <span className={styles.radio}></span>

                    <span className={styles.reasonText}>{reason}</span>
                  </label>
                ))}
              </div>

              <span className={styles.error}>{errors.reason?.message}</span>
            </div>

            <div className={styles.field}>
              <input
                type="text"
                placeholder="Full Name"
                className={styles.input}
                {...register("fullName")}
              />

              <span className={styles.error}>{errors.fullName?.message}</span>
            </div>

            <div className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                {...register("email")}
              />

              <span className={styles.error}>{errors.email?.message}</span>
            </div>

            <div className={styles.field}>
              <input
                type="tel"
                placeholder="Phone number"
                className={styles.input}
                {...register("phone")}
              />

              <span className={styles.error}>{errors.phone?.message}</span>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Book"}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default BookingModal;
