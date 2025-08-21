const { NavLink } = require("@/utils/navLinkTag");

function layout({ children }) {
  return (
    <div className="grid grid-cols-[77%_23%]">
      <div className="row-start-1 col-start-2 flex justify-end">
        <div className="flex gap-4 w-max text-white/60 font-bold">
          <NavLink
            href="/profile-votes/all"
            className="text-md hover:text-foreground p-2"
          >
            All
          </NavLink>
          <NavLink
            href="/profile-votes/upvotes"
            className="text-md hover:text-foreground p-2"
          >
            Upvotes
          </NavLink>
          <NavLink
            href="/profile-votes/downvotes"
            className="text-md hover:text-foreground p-2"
          >
            Downvotes
          </NavLink>
        </div>
      </div>
      <div className="row-start-2 col-start-1">{children}</div>
    </div>
  );
}

export default layout;
