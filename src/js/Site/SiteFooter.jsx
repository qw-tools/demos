export function SiteFooter() {
  return (
    <div className="container text-xs">
      <div className="flex items-center h-10">
        <div>
          &copy;
          <a href="https://tools.quake.world" className="text-sky-600">QuakeWorld Tools</a> - Created
          by <a className="text-sky-600" href="https://vikpe.org">vikpe</a>
        </div>
        <span className="text-gray-300 mx-2">|</span>
        <a
          href="https://github.com/qw-tools/recent-demos"
          className="text-sky-600"
        >
          Source on GitHub &#8599;
        </a>
      </div>
    </div>
  );
}
