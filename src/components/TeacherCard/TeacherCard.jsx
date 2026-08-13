import { useState } from "react";
import { FaStar, FaBookOpen, FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import styles from "./TeacherCard.module.css";

const avatarColors = [
  "#FBE9BA",
  "#9FBAAE",
  "#BFD6EA",
  "#CBDED3",
  "#9FB7CE",
  "#F2C0BD",
];

const getAvatarColor = (name) => {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
};

const TeacherCard = ({ teacher, onBookTrial, onRequireAuth }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(teacher.id);

  const handleHeartClick = () => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    toggleFavorite(teacher.id);
  };

  const levelsList = (
    <ul className={styles.levelsList}>
      {teacher.levels?.map((level, index) => {
        const [code, ...labelParts] = level.split(" ");
        const label = labelParts.join(" ");

        return (
          <li
            key={level}
            className={`${styles.levelBadge} ${
              index === 0 ? styles.levelBadgeActive : ""
            }`}
          >
            #{code} {label}
          </li>
        );
      })}
    </ul>
  );

  return (
    <li className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.avatar}
        />

        <svg className={styles.onlineIcon} width="12" height="12">
          <use href="/public/sprite.svg#icon-online" />
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.leftHeader}>
            <p className={styles.kicker}>Languages</p>
            <h3 className={styles.name}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>

          <div className={styles.rightHeader}>
            <ul className={styles.statsList}>
              <li className={styles.lessonsOnline}>
                <svg className={styles.bookIcon} width="16" height="16">
                  <use href="/public/sprite.svg#icon-book-open"></use>
                </svg>
                Lessons online
              </li>

              <svg className={styles.divider} width="2" height="16">
                <use href="/public/sprite.svg#icon-divider"></use>
              </svg>

              <li>Lessons done: {teacher.lessons_done}</li>

              <svg className={styles.divider} width="2" height="16">
                <use href="/public/sprite.svg#icon-divider"></use>
              </svg>

              <li className={styles.rating}>
                <svg className={styles.ratingIcon} width="15" height="14">
                  <use href="/public/sprite.svg#icon-rating"></use>
                </svg>
                Rating: {teacher.rating}
              </li>

              <svg className={styles.divider} width="2" height="16">
                <use href="/public/sprite.svg#icon-divider"></use>
              </svg>

              <li>
                Price / 1 hour:{" "}
                <span className={styles.price}>{teacher.price_per_hour}$</span>
              </li>
            </ul>

            <button
              type="button"
              className={styles.heartButton}
              onClick={handleHeartClick}
              aria-label="Toggle favorite"
            >
              {favorite ? (
                <svg className={styles.heartFilled} width="26" height="26">
                  <use href="/sprite.svg#icon-heart-filled"></use>
                </svg>
              ) : (
                <svg className={styles.heartIcon} width="26" height="26">
                  <use href="/sprite.svg#icon-heart"></use>
                </svg>
              )}
            </button>
          </div>
        </div>

        <p className={styles.line}>
          <span className={styles.label}>Speaks:</span>{" "}
          <span className={styles.value + " " + styles.underline}>
            {teacher.languages?.join(", ")}
          </span>
        </p>
        <p className={styles.line}>
          <span className={styles.label}>Lesson Info:</span>{" "}
          <span className={styles.value}>{teacher.lesson_info}</span>
        </p>
        <p className={styles.line}>
          <span className={styles.label}>Conditions:</span>{" "}
          <span className={styles.value}>{teacher.conditions?.join(" ")}</span>
        </p>

        {!isExpanded && (
          <>
            <button
              type="button"
              className={styles.readMore}
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </button>

            {levelsList}
          </>
        )}

        {isExpanded && (
          <div className={styles.expanded}>
            <p className={styles.experience}>{teacher.experience}</p>

            {teacher.reviews?.length > 0 && (
              <ul className={styles.reviewsList}>
                {teacher.reviews.map((review) => (
                  <li
                    key={`${review.reviewer_name}-${review.review_text?.slice(0, 10)}`}
                    className={styles.review}
                  >
                    <div className={styles.reviewHeader}>
                      <div
                        className={styles.reviewerAvatar}
                        style={{
                          backgroundColor: getAvatarColor(review.reviewer_name),
                        }}
                      >
                        {review.reviewer_name.charAt(0)}
                      </div>

                      <div className={styles.reviewerMeta}>
                        <span className={styles.reviewerName}>
                          {review.reviewer_name}
                        </span>
                        <span className={styles.reviewRating}>
                          <svg
                            className={styles.starIcon}
                            width="15"
                            height="14"
                          >
                            <use href="/public/sprite.svg#icon-rating"></use>
                          </svg>
                          {review.reviewer_rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className={styles.reviewText}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}

            {levelsList}

            <button
              type="button"
              className={styles.bookButton}
              onClick={() => onBookTrial(teacher)}
            >
              Book trial lesson
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default TeacherCard;
