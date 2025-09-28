export const Spinner = (props: { size?: "base" | "md" | "lg" }) => {
  let size = "w-8 h-8";
  if (props.size == "md") {
    size = "w-12 h-12";
  }
  if (props.size == "lg") {
    size = "w-16 h-16";
  }
  
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Основной спиннер */}
      <div className="relative">
        <div className={`${size} rounded-full border-4 border-gray-200 dark:border-gray-700`}></div>
        <div className={`${size} rounded-full border-4 border-transparent border-t-blue-500 animate-spin absolute top-0 left-0`}></div>
        <div className={`${size} rounded-full border-4 border-transparent border-t-purple-500 animate-spin absolute top-0 left-0`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      {/* Дополнительные точки */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      {/* Текст загрузки */}
      <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
        Загрузка...
      </p>
    </div>
  );
};
