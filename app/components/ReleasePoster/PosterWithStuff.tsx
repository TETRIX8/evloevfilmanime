import { Poster } from "./Poster";
import { ReleaseChips } from "./Chips";

const profile_lists = {
  // 0: "Не смотрю",
  1: { name: "Смотрю", bg_color: "bg-green-500" },
  2: { name: "В планах", bg_color: "bg-purple-500" },
  3: { name: "Просмотрено", bg_color: "bg-blue-500" },
  4: { name: "Отложено", bg_color: "bg-yellow-500" },
  5: { name: "Брошено", bg_color: "bg-red-500" },
};

export const PosterWithStuff = (props: {
  image: string;
  title_ru: string;
  title_original: string;
  description?: string;
  genres?: string;
  grade?: number;
  id: number;
  settings?: {
    showGenres?: boolean;
    showDescription?: boolean;
  };
  chipsSettings?: {
    enabled: boolean;
    gradeHidden?: boolean;
    statusHidden?: boolean;
    categoryHidden?: boolean;
    episodesHidden?: boolean;
    listHidden?: boolean;
    favHidden?: boolean;
    lastWatchedHidden?: boolean;
  };
  profile_list_status?: number;
  status?: {
    name: string;
  };
  category?: {
    name: string;
  };
  status_id?: number;
  episodes_released?: string;
  episodes_total?: string;
  is_favorite?: boolean;
}) => {
  const genres = [];
  const settings = {
    showGenres: true,
    showDescription: true,
    ...props.settings,
  };
  const chipsSettings = props.chipsSettings || {};

  const grade = props.grade ? Number(props.grade.toFixed(1)) : null;
  const profile_list_status = props.profile_list_status || null;
  let user_list = null;
  if (profile_list_status != null && profile_list_status != 0) {
    user_list = profile_lists[profile_list_status];
  }
  if (props.genres) {
    const genres_array = props.genres.split(",");
    genres_array.forEach((genre) => {
      genres.push(genre.trim());
    });
  }

  return (
    <article className="ef-poster-card">
      <div className="ef-poster-visual">
        <Poster image={props.image} className="ef-poster-image" />
        <div className="ef-poster-chips">
          <ReleaseChips
            {...props}
            user_list={user_list}
            grade={grade}
            settings={chipsSettings}
          />
        </div>
        {props.is_favorite && (
          <span className="ef-poster-favorite" aria-label="В избранном">
            ♥
          </span>
        )}
        <span className="ef-poster-play" aria-hidden="true">
          <span className="iconify mdi--play" />
        </span>
        {user_list && <span className="ef-poster-list">{user_list.name}</span>}
      </div>
      <div className="ef-poster-copy">
        <h3>{props.title_ru || props.title_original}</h3>
        {settings.showGenres && genres.length > 0 ? (
          <p>{genres.slice(0, 2).join(" · ")}</p>
        ) : (
          <p>
            {props.category?.name || props.status?.name || props.title_original}
          </p>
        )}
        {settings.showDescription && props.description && (
          <p className="ef-poster-description">{props.description}</p>
        )}
      </div>
    </article>
  );
};
