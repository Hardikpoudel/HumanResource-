import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleDelete(x,y) {
    console.log(x);
    axios
      .delete(`http://173.249.45.237:8081/hrs/employee/${x}`)
      .then((res) => {
        // const emp=data.filter((item)=>item.deleteID!== id)
        // SVGMetadataElement(emp)
        console.log(res.status);
        y();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <button class="btn" onClick={handleClickOpen}>
        {" "}
        <i class="fa fa-trash"></i> Delete
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              handleDelete(props.value,props.refresh);
            }}
            color="primary"
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
