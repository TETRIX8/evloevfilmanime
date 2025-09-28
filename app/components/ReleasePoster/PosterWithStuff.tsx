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
  const chipsSettings = props.chipsSettings || {}

  const grade = props.grade ? Number(props.grade.toFixed(1)) : null;
  const profile_list_status = props.profile_list_status || null;
  let user_list = null;
  if (profile_list_status != null || profile_list_status != 0) {
    user_list = profile_lists[profile_list_status];
  }
  if (props.genres) {
    const genres_array = props.genres.split(",");
    genres_array.forEach((genre) => {
      genres.push(genre.trim());
    });
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl group anime-card shadow-2xl">
      {/* Основной постер */}
      <Poster
        image={props.image}
        className="w-auto h-auto min-w-full min-h-full flex-grow-1 image-zoom poster-glow"
      />
      
      {/* Градиентные наложения */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Блестящий эффект при hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Чипы с рейтингом и статусом */}
      <div className="absolute z-20 top-3 left-3 right-3">
        <ReleaseChips
          {...props}
          user_list={user_list}
          grade={grade}
          settings={chipsSettings}
        />
      </div>
      
      {/* Иконка избранного */}
      {props.is_favorite && (
        <div className="absolute z-20 top-3 right-3">
          <div className="flex items-center justify-center w-8 h-8 bg-pink-500/90 backdrop-blur-sm rounded-full shadow-lg icon-bounce">
            <span className="w-4 h-4 text-white iconify mdi--heart"></span>
          </div>
        </div>
      )}
      
      {/* Информация о релизе */}
      <div className="absolute z-20 bottom-3 left-3 right-3 lg:translate-y-[100%] group-hover:lg:translate-y-0 transition-all duration-500 ease-out">
        <div className="lg:-translate-y-[calc(100%_+_1rem)] group-hover:lg:translate-y-0 transition-all duration-500 ease-out">
          {/* Жанры */}
          {settings.showGenres && genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {genres.slice(0, 3).map((genre: string, index: number) => (
                <span
                  key={`release_${props.id}_genre_${genre}_${index}`}
                  className="px-2 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30 genre-tag"
                >
                  {genre}
                </span>
              ))}
              {genres.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30 genre-tag">
                  +{genres.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Заголовки */}
          {props.title_ru && (
            <h3 className="text-lg font-bold text-white drop-shadow-lg line-clamp-2 group-hover:text-blue-200 transition-colors duration-300 text-shimmer">
              {props.title_ru}
            </h3>
          )}
          {props.title_original && (
            <p className="mt-1 text-sm text-gray-200 drop-shadow-lg line-clamp-1 group-hover:text-gray-100 transition-colors duration-300">
              {props.title_original}
            </p>
          )}
        </div>
        
        {/* Описание */}
        {settings.showDescription && props.description && (
          <div className="mt-3 p-3 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-200 line-clamp-3 group-hover:text-white transition-colors duration-300">
              {props.description}
            </p>
          </div>
        )}
      </div>
      
      {/* Индикатор загрузки/просмотра */}
      {props.profile_list_status && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 progress-bar-animated">
          <div 
            className={`h-full transition-all duration-500 ${
              props.profile_list_status === 3 ? 'bg-green-500' : 
              props.profile_list_status === 1 ? 'bg-blue-500' : 
              props.profile_list_status === 2 ? 'bg-yellow-500' : 
              'bg-gray-500'
            }`}
            style={{ width: '100%' }}
          ></div>
        </div>
      )}
    </div>
  );
};
