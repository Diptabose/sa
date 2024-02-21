"use client";
import {
  TextField,
  InputAdornment,
  Box,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import useDeviceProperties from "@/utils/app/useDeviceProperties";
import * as CommonMethods from "@/utils/app/commonMethods";
import { User } from "@/types/user";
import Link from "next/link";
import { DeleteMethod, GetMethod } from "@/utils/app/api";
import GenericDialog from "@/components/atomic/dialogs/GenericDialog";
import { revalidateRoute } from "@/app/server_actions/actions";
import { useDebouncedCallback } from "use-debounce";
import SentimentContext, {
  SentimentContextProps,
} from "@/store/contexts/sentiment.context";

interface Props {
  users: User[];
  totalCount: number;
}

function Users({ users, totalCount }: Props) {
  const { state, dispatch } =
    useContext<SentimentContextProps>(SentimentContext);
  const user_id = state?.userData?._id;
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [search, setSearch] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [totCount, setTotalCount] = useState<number>(totalCount);

  const [limit, setLimit] = useState(CommonMethods.DEFAULT_ROWS_PER_PAGE);
  const deviceProperties = useDeviceProperties();

  const [skip, setSkip] = useState<number>(0);

  const handleSearch = useDebouncedCallback((search_value) => {
    setSearchLoader(true);
    const value = (search_value as string).toLowerCase();

    console.log("The value is ", value);
    setSkip(0);
    getUsers(limit, 0, value);
    setSearchLoader(false);
  }, 700);

  // async function handleSearch(event: any) {

  //   // if (value?.length > 0) {
  //   //   let searchUsers = users.filter(
  //   //     (user) =>
  //   //       user.username.toLowerCase().includes(value) ||
  //   //       user.name.toLowerCase().includes(value)
  //   //   );
  //   //   setFilteredUsers(searchUsers);
  //   //   setSearchLoader(false);
  //   // } else {
  //   //   setFilteredUsers(users);
  //   // }

  // }

  function cancelSearch() {
    setSearch("");
    console.log("calling on empty search");
    getUsers(limit, 0, "");
    //setFilteredUsers(users);
  }

  function handleChangeRowsPerPage(event: any) {
    setLimit(event.target.value);
    setSkip(0);
    getUsers(event.target.value, 0, search);
  }

  function handleChangePage(event: any, newPage: any) {
    if (skip >= totalCount) {
      return;
    }
    const leap = newPage * limit;
    setSkip(leap);
    getUsers(limit, leap, search);
  }

  function getUsers(limit: number, skip: number, q: string) {
    GetMethod(`user/all`, {
      params: {
        limit: limit,
        skip: skip,
        q: q,
      },
    })
      .then((response) => {
        if (response.success) {
          console.log("The response is ", response);
          setFilteredUsers(response?.data?.users);
          setTotalCount(response?.data?.totalCount);
        }
      })
      .catch(() => {})
      .finally(() => {});
  }

  const currentPage = Math.floor(skip / limit);

  const OpenDialog = (user_id: string) => {
    setOpenDialog(true);
    setSelectedId(user_id);
  };

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
    setSelectedId("");
    setLoading(false);
  };

  const deleteUser = () => {
    setLoading(true);
    console.log("The selected id is", selectedId);
    DeleteMethod(`user/delete/${selectedId}`)
      .then(() => {
        toggleDialog();
        revalidateRoute(
          "/sentimentAnalysis/settings/users",
          "/sentimentAnalysis/settings/redirect?to=users"
        );
      })
      .catch((err) => {
        console.log("The errror is ", err);
        setErrMessage(err["response"]["data"]["message"]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-1 flex-col gap-small p-2 h-full justify-start">
      <div className="h-[10%] flex flex-1 justify-between items-center px-2 flex-wrap">
        <div className="text-lg font-semibold">User Management</div>
        <div className="flex items-center gap-small flex-wrap">
          <TextField
            size="small"
            className=""
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoader(true);
              handleSearch(e.target.value);
            }}
            placeholder="Search"
            value={search}
            inputProps={{
              style: { height: "15px" },
              className: "placeholder:text-sm",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {search.length === 0 ? (
                    <div></div>
                  ) : searchLoader ? (
                    <Box className="flex mr-2">
                      <CircularProgress
                        size={16}
                        className="text-content-brand"
                      />
                    </Box>
                  ) : (
                    <ClearIcon
                      className="mr-2 cursor-pointer"
                      onClick={cancelSearch}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Button
            size="small"
            variant="contained"
            LinkComponent={Link}
            href="/sentimentAnalysis/settings/users/create_user"
          >
            Add User
          </Button>
        </div>
      </div>

      <div className="h-[90%] flex flex-col gap-small">
        <div className="flex h-full overflow-y-auto">
          <TableContainer sx={{}} className="h-full overflow-y-auto">
            <Table size="small" stickyHeader aria-label="sticky table">
              <TableHead className="py-2">
                <TableRow>
                  {/* <TableCell >Name</TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="h-full overflow-y-auto">
                {filteredUsers?.length > 0 &&
                  filteredUsers.map((user) => (
                    <TableRow key={user?._id} className="w-full">
                      <TableCell className="w-1/2" title={user?.name}>
                        {user?.name}
                      </TableCell>
                      <TableCell className="w-1/2" title={user?.username}>
                        {user?.username}
                      </TableCell>
                      <TableCell className="w-1/2" title={user?.userRole?.role}>
                        {user?.userRole?.role}
                      </TableCell>
                      <TableCell
                        className="w-1/2"
                        title={user.active ? "Active" : "Inactive"}
                      >
                        {user?.active ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell
                        className="w-1/2"
                        title="actions"
                        align="right"
                      >
                        <div className="flex flex-row gap-2 items-center justify-center">
                          <IconButton
                            LinkComponent={Link}
                            disabled={user?._id === user_id}
                            href={`/sentimentAnalysis/settings/users/create_user?id=${user?._id}`}
                          >
                            <EditIcon
                              color="primary"
                              className={
                                user?._id !== user_id
                                  ? "text-content-brand"
                                  : "text-content-placeholder"
                              }
                            />
                          </IconButton>
                          {/* <Link href={`/sentimentAnalysis/settings/users/view?id=${user?._id}`}>
                          <VisibilityIcon color='primary' className="text-accordion-blue" />
                        </Link> */}
                          <IconButton
                            onClick={() => {
                              OpenDialog(user?._id);
                            }}
                            disabled={user?._id === user_id}
                          >
                            <DeleteIcon
                              color="primary"
                              className={
                                user?._id !== user_id
                                  ? "text-content-brand"
                                  : "text-content-placeholder"
                              }
                            />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {filteredUsers?.length === 0 ? (
              <div
                className="flex justify-center items-center"
                style={{
                  height: `${
                    deviceProperties.height -
                    (deviceProperties.isMobileDevice ||
                    deviceProperties.isTabletDevice
                      ? 347
                      : 209)
                  }px`,
                }}
              >
                No data to display
              </div>
            ) : (
              <></>
            )}
          </TableContainer>
        </div>
        <div className="w-full">
          <TablePagination
            labelRowsPerPage={CommonMethods.PAGINATION_ROW_LABEL}
            rowsPerPageOptions={CommonMethods.ROWS_PER_PAGE}
            component="div"
            className="w-full"
            count={totCount}
            rowsPerPage={limit}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>

      <GenericDialog
        title="Delete"
        open={openDialog}
        dialogProps={{
          onClose: toggleDialog,
        }}
        content="Are you sure to delete the user ?"
        actions={
          <div className="flex items-center justify-between gap-small w-full">
            <div className="text-content-error text-sm">{errMessage}</div>
            <div className="flex items-center gap-small">
              <Button variant="outlined" size="small" onClick={toggleDialog}>
                Cancel
              </Button>
              <Button variant="contained" size="small" onClick={deleteUser}>
                {loading && (
                  <CircularProgress size={16} className="text-white" />
                )}
                Delete
              </Button>
            </div>
          </div>
        }
        actionProps={{}}
      />
    </div>
  );
}

export default Users;
