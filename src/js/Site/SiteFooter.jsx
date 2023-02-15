export function SiteFooter() {
  return (
    <div className="container text-xs">
      <div className="flex items-center h-10">
        <div className="space-x-8">
          &copy;{" "}
          <a href="https://tools.quake.world" className="font-bold">
            QuakeWorld Tools
          </a>
          <span>
            Created by{" "}
            <a className="text-sky-600" href="https://vikpe.org">
              vikpe
            </a>{" "}
            a.k.a. &quot;XantoM&quot;
          </span>
        </div>
        <a
          href="https://github.com/qw-tools/recent-demos"
          className="text-sky-600 ml-auto"
        >
          Source on GitHub &#8599;
        </a>
      </div>
    </div>
  );
}
