import { sinceUnixDate } from "#/api/utils";
import { Chip } from "../Chip/Chip";

interface ChipProps {
  settings?: any;
  grade?: any;
  status?: any;
  status_id?: any;
  user_list?: any;
  episodes_released?: any;
  episodes_total?: any;
  category?: any;
  is_favorite?: any;
  last_view_episode?: any;
  last_view_timestamp?: any;
}

export const ReleaseChips = ({
  settings,
  grade,
  status,
  status_id,
  user_list,
  episodes_released,
  episodes_total,
  category,
  is_favorite,
  last_view_episode,
  last_view_timestamp,
}: ChipProps) => {
  const chipSettings = {
    enabled: true,
    gradeHidden: false,
    statusHidden: false,
    categoryHidden: false,
    episodesHidden: false,
    listHidden: false,
    favHidden: false,
    lastWatchedHidden: true,
    ...settings,
  };

  return (
    <div
      className={`${chipSettings.enabled ? "flex" : "hidden"} gap-1.5 flex-wrap`}
    >
      {!chipSettings.gradeHidden && grade ? (
        <Chip
          className="min-w-12"
          bg_color={
            grade == 0
              ? "hidden"
              : grade < 2
                ? "bg-red-900"
                : grade < 3
                  ? "bg-orange-900"
                  : grade < 4
                    ? "bg-yellow-900"
                    : "bg-emerald-900"
          }
          name={`${grade}`}
        />
      ) : (
        ""
      )}

      {!chipSettings.statusHidden && status ? (
        <Chip name={status.name} bg_color="bg-blue-950" />
      ) : (
        !chipSettings.statusHidden &&
        status_id > 0 && (
          <Chip
            name={
              status_id == 1
                ? "Завершено"
                : status_id == 2
                  ? "Онгоинг"
                  : status_id == 3 && "Анонс"
            }
            bg_color={
              status_id == 1
                ? "bg-emerald-950"
                : status_id == 2
                  ? "bg-blue-950"
                  : "bg-violet-950"
            }
          />
        )
      )}
      {!chipSettings.episodesHidden && (
        <Chip
          name={episodes_released && episodes_released}
          name_2={episodes_total ? episodes_total + " эп." : "? эп."}
          devider="/"
          bg_color="bg-gray-900"
        />
      )}
      {!chipSettings.categoryHidden && category && (
        <Chip name={category.name} bg_color="bg-indigo-950" />
      )}
      {!chipSettings.listHidden && user_list && (
        <Chip bg_color={`${user_list.bg_color}/90`} name={user_list.name} />
      )}
      {!chipSettings.favHidden && is_favorite && (
        <div className="flex items-center justify-center bg-gradient-to-r from-pink-500/90 to-pink-600/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <span className="w-3 h-3 px-2 py-1.5 text-white iconify mdi--heart"></span>
        </div>
      )}
      {!chipSettings.lastWatchedHidden && last_view_episode && (
        <Chip
          name={
            last_view_episode.name
              ? last_view_episode.name
              : `${last_view_episode.position + 1} серия`
          }
          name_2={last_view_timestamp && sinceUnixDate(last_view_timestamp)}
          devider=", "
          bg_color="bg-gradient-to-r from-cyan-500/90 to-cyan-600/90"
        />
      )}
    </div>
  );
};
