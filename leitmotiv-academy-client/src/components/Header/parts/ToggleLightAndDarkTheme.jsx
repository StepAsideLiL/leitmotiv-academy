import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const ToggleLightAndDarkTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (event) => {
    if (event.target.checked) {
      setTheme("business");
    } else {
      setTheme("corporate");
    }
  };

  return (
    <div className="mx-5">
      <label className="swap btn rounded-full">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onChange={handleToggle} />

        {/* volume on icon */}
        <BsMoon className="swap-off text-xl" />

        {/* volume off icon */}
        <BsSun className="swap-on text-xl" />
      </label>
    </div>
  );
};

export default ToggleLightAndDarkTheme;
