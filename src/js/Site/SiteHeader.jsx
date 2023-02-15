const pages = [{ url: import.meta.env.BASE_URL, title: "Recent Demos" }];

export function SiteHeader() {
  return (
    <div className="bg-gray-800">
      <div className="container h-12 items-center text-white text-sm">
        <div className="flex items-center h-12">
          <a
            href="https://tools.quake.world/"
            className="px-2 hover:text-yellow-200"
          >
            QuakeWorld Tools
          </a>
          <div className="text-gray-400 mr-6 font-mono">Demos</div>
          {pages.map((page) => (
            <a
              key={page.url}
              href={page.url}
              className="flex px-2 h-full items-center hover:text-white hover:opacity-100 font-bold text-green-300 opacity-100"
            >
              {page.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
