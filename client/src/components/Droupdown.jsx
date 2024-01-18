// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { FiList } from "react-icons/fi";

export default function Droupdown({ options = [{}] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <FiList className="text-red" />
      </button>
      {isExpanded && (
        <div className="bg-slate-200 shadow-md w-24">
          <ul>
            {options.map((options) => (
              <li className="hover:bg-blue-400 hover:text-white" key={options}>
                {options}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
//{options.map(options)(<li key={options}> {options}</li>)}
