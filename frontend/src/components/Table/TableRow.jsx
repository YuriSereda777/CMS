import TableLink from "./TableLink";
import DateFormatter from "../../UI/DateFormatter";
import StatusFormatter from "../../UI/StatusFormatter";

const TableRow = ({ element, linkTo, table }) => {
  let result = [];

  let i = 0;
  for (const [, value] of Object.entries(element)) {
    result.push({
      value,
      colSize: table[i].colSize,
      label: table[i].label,
      isDate: table[i].isDate,
      isStatus: table[i].isStatus,
    });
    i++;
  }

  return (
    <div className="text-lg text-gray-600 tracking-tight break-words">
      <TableLink linkTo={linkTo}>
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-0.5 lg:gap-2">
          {result.map((r, index) => (
            <div key={index} className={r.colSize}>
              {r.isDate ? (
                <p className="flex flex-row flex-wrap gap-2 break-words">
                  <span className="block lg:hidden font-semibold">
                    {r.label} :
                  </span>
                  <DateFormatter date={r.value} />
                </p>
              ) : r.isStatus ? (
                <p className="flex flex-row flex-wrap gap-2 break-words">
                  <span className="block lg:hidden font-semibold">
                    {r.label} :
                  </span>
                  <StatusFormatter status={r.value} />
                </p>
              ) : (
                <p className="flex flex-row flex-wrap gap-2">
                  <span className="block lg:hidden font-semibold">
                    {r.label} :
                  </span>
                  <p className="break-all">{r.value}</p>
                </p>
              )}
            </div>
          ))}
        </div>
      </TableLink>
    </div>
  );
};

export default TableRow;
