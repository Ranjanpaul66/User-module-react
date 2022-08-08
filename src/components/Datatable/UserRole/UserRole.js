import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Fab,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ResponsiveAppBar from "../../Shared/ResponsiveAppBar";
import Sidebar from "../../Shared/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Addmodal from "../UsersTable/AddModal";
import { indigo } from "@mui/material/colors";
import { BorderColor } from "@mui/icons-material";
import HeadCells from "./HeadCells";
import EditModal from "./EditModal";
import { BASE_URL } from "../../Shared/Common";
const axios = require("axios");

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = HeadCells;
console.log("headCells", headCells);
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: "#5c6bc0",
        color: "white",
      }}
    >
      {numSelected < 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Users List
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
const url = "http://127.0.0.1:8000/api/v1/user/user-list";

export default function UserRole() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [error, seterror] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [userEdit, setUserEdit] = React.useState(null);
  // const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [getObj, setGetObj] = React.useState({});

  const call_api = () => {
    fetch(url, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Api is not working!");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data", data.data);
        setUsers(data.data);
      })
      .catch((err) => {
        seterror(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (getObj !== null) {
      console.log("getObj", getObj);
    }
  }, [getObj]);

  const getObjOfEdit = async (obj_id) => {
    const payload = {
      user_id: obj_id,
    };

    try {
      const resp = await axios.post(
        BASE_URL.concat("/api/v1/user/get-user"),
        payload
      );
      const response = resp;
      if (response.status == 200 && response.data.status_code == 200) {
        setGetObj(response.data.data);
      } else {
        console.log("Error", response.message);
      }
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (users.length > 0) {
      setIsLoading(false);
    }
  }, [users]);

  React.useEffect(() => {
    call_api();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleOpen = () => setOpen(true);
  const handleOpenEdit = (obj_id) => {
    getObjOfEdit(obj_id);

    return setOpenEdit(true);
  };

  const table_load = () => call_api();
  return (
    <Box>
      <ResponsiveAppBar />
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Sidebar />

        <Box flex={8} p={8}>
          <Box>
            <Typography
              variant="h6"
              id=""
              component="div"
              color={"red"}
              align="center"
            >
              {error}
            </Typography>
            <Typography
              variant="h6"
              id=""
              component="div"
              color={"green"}
              align="center"
            >
              {success}
            </Typography>
          </Box>

          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750, bgcolor: "#e8eaf6" }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  sx={{
                    bgcolor: "#e8eaf6",
                    fontWeight: "bold",
                    fontSize: "30",
                  }}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={users.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(users, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      console.log("row", row);
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          // role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.full_name}
                          </TableCell>
                          <TableCell align="right">{row.mobile}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                              onClick={() => handleOpenEdit(row.id)}
                            >
                              <BorderColor />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {/* {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ textAlign: "right", bgcolor: "#e8eaf6" }}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleOpen}
                sx={{ bgcolor: "#5c6bc0" }}
              >
                <AddIcon />
              </Fab>
            </Box>

            <Addmodal
              open={open}
              setOpen={setOpen}
              seterror={seterror}
              setSuccess={setSuccess}
              table_load={table_load}
            />
            <EditModal
              open={openEdit}
              setOpen={setOpenEdit}
              getObj={getObj}
              seterror={seterror}
              setSuccess={setSuccess}
              table_load={table_load}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ bgcolor: "#e8eaf6" }}
            />
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
