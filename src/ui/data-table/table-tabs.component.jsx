import { Tab, Tabs } from "react-bootstrap";
import { useDataTableContext } from "./use-data-table-context.hook";

export const TableTabs = () => {
  const ctx = useDataTableContext();
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { isActive } = ctx?.settings?.params;

  const activeKey = [isActive ? "enable" : "disable"];
  return (
    <Tabs
      activeKey={activeKey}
      style={{
        borderBottom: "0px",
      }}
      onSelect={(e) => {
        if (e === "enable") {
          ctx.changeActiveStatus(true);
        } else {
          ctx.changeActiveStatus(false);
        }
      }}
    >
      <Tab eventKey="enable" title="Enabled" className="enable" />
      <Tab eventKey="disable" title="Disabled" className="disable" />
    </Tabs>
  );
};
