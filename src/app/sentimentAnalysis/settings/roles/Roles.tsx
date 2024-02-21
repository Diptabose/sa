"use client";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  TextField,
  Box,
  CircularProgress,
  InputAdornment,
  Button,
} from "@mui/material";

import Link from "next/link";
import React, { useRef, useState } from "react";
import useDeviceProperties from "@/utils/app/useDeviceProperties";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InfoIcon from "@mui/icons-material/Info";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import * as CommonMethods from "@/utils/app/commonMethods";
import { useRouter } from "next/navigation";
import { RoleValues } from "@/types/formik";
import { GetMethod } from "@/utils/app/api";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  rolesData: RoleValues[];
  totalCount: number;
}

function Roles({ rolesData, totalCount }: Props) {
  const router = useRouter();

  const [filteredRoles, setFilteredRoles] = useState<RoleValues[]>(rolesData);
  const deviceProperties = useDeviceProperties();
  const [search, setSearch] = useState<string>("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [limit, setLimit] = useState(CommonMethods.DEFAULT_ROWS_PER_PAGE);
  const [skip, setSkip] = useState<number>(0);
  const [totCount , setTotalCount] = useState<number>(totalCount);

  const handleSearch = useDebouncedCallback((search_value) => {
    setSearchLoader(true);
    const value = (search_value as string).toLowerCase();
    setSkip(0);
    getRoles(limit, 0 , value);
    setSearchLoader(false);
  }, 700);

  // function handleSearch(event: any) {
  //   setSearchLoader(true);
  //   setSearch(event.target.value);
  //   if (event.target.value?.length > 0) {
  //     let searchRoles = rolesData.filter((role) =>
  //       role.role
  //         .toLocaleLowerCase()
  //         .includes(event.target.value.toLocaleLowerCase())
  //     );
  //     setFilteredRoles(searchRoles);
  //     setSearchLoader(false);
  //   } else {
  //     setFilteredRoles(rolesData);
  //   }
  // }

  function cancelSearch() {
    setSearch("");
    getRoles(limit , 0, "");
  }

  function handleChangeRowsPerPage(event: any) {
    setLimit(event.target.value);
    setSkip(0);
    getRoles(event.target.value, 0, search);
  }

  function handleChangePage(event: any, newPage: any) {
    if (skip >= totalCount) {
      return;
    }
    const leap = newPage * limit;
    setSkip(leap);
    getRoles(limit, leap, search);
  }

  function getRoles(limit: number, skip: number , q:string) {
    GetMethod(`settings/roles/all`, {
      params: {
        limit: limit,
        skip: skip,
        q: q,
      },
    })
      .then((response) => {
        if (response.success) {
          setFilteredRoles(response?.data?.roles);
          setTotalCount(response?.data?.totalCount);
        }
      })
      .catch(() => {})
      .finally(() => {});
  }

  const currentPage = Math.floor(skip / limit);

  return (
    <div className="flex flex-1 flex-col gap-2 p-2 h-full justify-start">
      <div className="h-[10%] flex flex-1 justify-between items-center px-2">
        <div className="text-lg font-semibold">Roles</div>
        <div className="flex items-center gap-2">
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
              style: { height: "15px"  },
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
            href="/sentimentAnalysis/settings/roles/create_role"
          >
            Create Role
          </Button>
        </div>
      </div>

      <div className="h-[90%] flex flex-col gap-small">
        <div className="flex h-full overflow-y-auto">
          <TableContainer sx={{}} className="h-full overflow-y-auto">
            <Table size="small" stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {/* <TableCell >Name</TableCell> */}
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="h-full overflow-y-auto">
                {filteredRoles?.length > 0 &&
                  filteredRoles.map((role) => (
                    <TableRow key={role._id} className="w-full border-2 border-red-500">
                      {/* <TableCell title={user.name}>
                  {user.name}
                </TableCell> */}
                      <TableCell title={role.role} className="w-1/2">
                        {role.role}
                      </TableCell>
                      <TableCell
                        title={role.active ? "Active" : "Inactive"}
                        className="w-1/2"
                      >
                        {role.active ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell align="right" className="w-1/2">
                        <div className="flex flex-row gap-2 items-center justify-center">
                          <Link
                            href={`/sentimentAnalysis/settings/roles/create_role?id=${role._id}`}
                          >
                            <EditIcon
                              color="primary"
                              className="text-content-brand"
                            />
                          </Link>
                          {/* <Link href={`/sentimentAnalysis/settings/roles/view?id=${role._id}`}>
                        <VisibilityIcon color='primary' className='text-content-brand' />
                      </Link> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {filteredRoles?.length === 0 ? (
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
    </div>
  );
}

export default Roles;
