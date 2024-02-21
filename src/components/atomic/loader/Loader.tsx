import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 999 ,  }}
      open={true}
    >
      <CircularProgress color="inherit" className="text-content-brand"/>
    </Backdrop>
  );
};
export default Loader;
