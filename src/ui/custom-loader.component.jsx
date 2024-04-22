import { Spinner } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
export function CustomLoader({ styles }) {
  return <Spinner variant={"primary"} style={styles} />;
}
