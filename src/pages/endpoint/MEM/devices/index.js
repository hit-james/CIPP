import { Layout as DashboardLayout } from "/src/layouts/index.js";
import { CippTablePage } from "/src/components/CippComponents/CippTablePage.jsx";
import { useSettings } from "/src/hooks/use-settings";
import { EyeIcon } from "@heroicons/react/24/outline";
import {
  Sync,
  RestartAlt,
  LocationOn,
  Password,
  PasswordOutlined,
  Key,
  Edit,
  Security,
  FindInPage,
  Shield,
  Archive,
  AutoMode,
  Recycling,
  ManageAccounts,
} from "@mui/icons-material";

const Page = () => {
  const pageTitle = "Devices";
  const tenantFilter = useSettings().currentTenant;

  const actions = [
    {
      label: "View in Intune",
      link: `https://intune.microsoft.com/${tenantFilter}/#view/Microsoft_Intune_Devices/DeviceSettingsMenuBlade/~/overview/mdmDeviceId/[id]`,
      color: "info",
      icon: <EyeIcon />,
      target: "_blank",
      multiPost: false,
      external: true,
    },
    {
      label: "Change Primary User",
      type: "POST",
      icon: <ManageAccounts />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "!users",
      },
      fields: [
        {
          type: "autoComplete",
          name: "user",
          label: "Select User",
          multiple: false,
          creatable: false,
          api: {
            url: "/api/ListGraphRequest",
            data: {
              Endpoint: "users",
              $select: "id,displayName,userPrincipalName",
              $top: 999,
              $count: true,
            },
            queryKey: "ListUsersAutoComplete",
            dataKey: "Results",
            labelField: (user) => `${user.displayName} (${user.userPrincipalName})`,
            valueField: "id",
            addedField: {
              userPrincipalName: "userPrincipalName",
            },
            showRefresh: true,
          },
        },
      ],
      confirmText: "Select the User to set as the primary user for this device",
    },
    {
      label: "Rename Device",
      type: "POST",
      icon: <Edit />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "setDeviceName",
      },
      confirmText: "Enter the new name for the device",
      fields: [
        {
          type: "textField",
          name: "input",
          label: "New Device Name",
          required: true,
        },
      ],
    },
    {
      label: "Sync Device",
      type: "POST",
      icon: <Sync />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "syncDevice",
      },
      confirmText: "Are you sure you want to sync this device?",
    },
    {
      label: "Reboot Device",
      type: "POST",
      icon: <RestartAlt />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "rebootNow",
      },
      confirmText: "Are you sure you want to reboot this device?",
    },
    {
      label: "Locate Device",
      type: "POST",
      icon: <LocationOn />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "locateDevice",
      },
      confirmText: "Are you sure you want to locate this device?",
    },
    {
      label: "Retrieve LAPs password",
      type: "POST",
      icon: <Password />,
      url: "/api/ExecGetLocalAdminPassword",
      data: {
        GUID: "azureADDeviceId",
      },
      confirmText: "Are you sure you want to retrieve the local admin password?",
    },
    {
      label: "Rotate Local Admin Password",
      type: "POST",
      icon: <PasswordOutlined />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "RotateLocalAdminPassword",
      },
      confirmText: "Are you sure you want to rotate the password for this device?",
    },
    {
      label: "Retrieve Bitlocker Keys",
      type: "POST",
      icon: <Key />,
      url: "/api/ExecGetRecoveryKey",
      data: {
        GUID: "azureADDeviceId",
      },
      confirmText: "Are you sure you want to retrieve the Bitlocker keys?",
    },
    {
      label: "Windows Defender Full Scan",
      type: "POST",
      icon: <Security />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "WindowsDefenderScan",
        quickScan: false,
      },
      confirmText: "Are you sure you want to perform a full scan on this device?",
    },
    {
      label: "Windows Defender Quick Scan",
      type: "POST",
      icon: <FindInPage />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "WindowsDefenderScan",
        quickScan: true,
      },
      confirmText: "Are you sure you want to perform a quick scan on this device?",
    },
    {
      label: "Update Windows Defender",
      type: "POST",
      icon: <Shield />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "windowsDefenderUpdateSignatures",
      },
      confirmText:
        "Are you sure you want to update the Windows Defender signatures for this device?",
    },
    {
      label: "Generate logs and ship to MEM",
      type: "POST",
      icon: <Archive />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "CreateDeviceLogCollectionRequest",
      },
      confirmText: "Are you sure you want to generate logs and ship these to MEM?",
    },
    {
      label: "Fresh Start (Remove user data)",
      type: "POST",
      icon: <RestartAlt />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "cleanWindowsDevice",
        keepUserData: false,
      },
      confirmText: "Are you sure you want to Fresh Start this device?",
    },
    {
      label: "Fresh Start (Do not remove user data)",
      type: "POST",
      icon: <RestartAlt />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "cleanWindowsDevice",
        keepUserData: true,
      },
      confirmText: "Are you sure you want to Fresh Start this device?",
    },
    {
      label: "Wipe Device, keep enrollment data",
      type: "POST",
      icon: <RestartAlt />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "cleanWindowsDevice",
        keepUserData: false,
        keepEnrollmentData: true,
      },
      confirmText: "Are you sure you want to wipe this device, and retain enrollment data?",
    },
    {
      label: "Wipe Device, remove enrollment data",
      type: "POST",
      icon: <RestartAlt />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "cleanWindowsDevice",
        keepUserData: false,
        keepEnrollmentData: false,
      },
      confirmText: "Are you sure you want to wipe this device, and remove enrollment data?",
    },
    {
      label: "Wipe Device, keep enrollment data, and continue at powerloss",
      type: "POST",
      icon: <RestartAlt />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "cleanWindowsDevice",
        keepEnrollmentData: true,
        keepUserData: false,
        useProtectedWipe: true,
      },
      confirmText:
        "Are you sure you want to wipe this device? This will retain enrollment data. Continuing at powerloss may cause boot issues if wipe is interrupted.",
    },
    {
      label: "Wipe Device, remove enrollment data, and continue at powerloss",
      type: "POST",
      icon: <RestartAlt />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "cleanWindowsDevice",
        keepEnrollmentData: false,
        keepUserData: false,
        useProtectedWipe: true,
      },
      confirmText:
        "Are you sure you want to wipe this device? This will also remove enrollment data. Continuing at powerloss may cause boot issues if wipe is interrupted.",
    },
    {
      label: "Autopilot Reset",
      type: "POST",
      icon: <AutoMode />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "wipe",
        keepUserData: "false",
        keepEnrollmentData: "true",
      },
      confirmText: "Are you sure you want to Autopilot Reset this device?",
    },
    {
      label: "Delete device",
      type: "POST",
      icon: <Recycling />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "delete",
      },
      confirmText: "Are you sure you want to retire this device?",
    },
    {
      label: "Retire device",
      type: "POST",
      icon: <Recycling />,
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "retire",
      },
      confirmText: "Are you sure you want to retire this device?",
    },
  ];

  const offCanvas = {
    extendedInfoFields: ["deviceName", "userPrincipalName"],
    actions: actions,
  };

  return (
    <CippTablePage
      title={pageTitle}
      apiUrl="/api/ListGraphRequest"
      apiData={{
        Endpoint: "deviceManagement/managedDevices",
      }}
      apiDataKey="Results"
      actions={actions}
      queryKey={`MEMDevices-${tenantFilter}`}
      offCanvas={offCanvas}
      simpleColumns={[
        "deviceName",
        "userPrincipalName",
        "complianceState",
        "manufacturer",
        "model",
        "operatingSystem",
        "osVersion",
        "enrolledDateTime",
        "managedDeviceOwnerType",
        "deviceEnrollmentType",
        "joinType",
      ]}
    />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
