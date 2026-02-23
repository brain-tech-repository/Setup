"use client";

import { useEffect, useState } from "react";
import { useRoleById, useUpdateRolePermissions } from "../hooks/useRole";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ACTIONS = ["create", "view", "update", "delete"];

export default function RolePermissionMenu({
  roleId,
}: {
  roleId: string;
}) {
  const { data: role, isLoading } = useRoleById(roleId);
  const updatePermissions = useUpdateRolePermissions(roleId);

  const [menus, setMenus] = useState<any[]>([]);

  /* ================= LOAD MENUS FROM BACKEND ================= */
  useEffect(() => {
    if (role?.menus) {
      setMenus(role.menus);
    }
  }, [role]);

  if (isLoading) return <div>Loading permissions...</div>;

  /* ================= TOGGLE ================= */
  const handleToggle = (
    parentIndex: number,
    subIndex: number,
    action: string,
    value: boolean
  ) => {
    const updated = [...menus];
    updated[parentIndex].submenus[subIndex].permissions[action] = value;
    setMenus(updated);
  };

  const handleToggleRowAll = (
    parentIndex: number,
    subIndex: number,
    value: boolean
  ) => {
    const updated = [...menus];

    ACTIONS.forEach((action) => {
      updated[parentIndex].submenus[subIndex].permissions[action] = value;
    });

    setMenus(updated);
  };

  const isRowAllSelected = (permissions: any) =>
    ACTIONS.every((action) => permissions[action]);

  /* ================= SAVE ================= */
  const handleSave = () => {
    const payload: any[] = [];

    menus.forEach((parent) => {
      parent.submenus.forEach((sub: any) => {
        payload.push({
          menu: sub._id,
          permissions: sub.permissions,
        });
      });
    });

    updatePermissions.mutate({
      menuPermissions: payload,
    });
  };

  /* ================= UI ================= */
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        {menus.map((menu, parentIndex) => (
          <AccordionItem key={menu._id} value={menu._id}>
            <AccordionTrigger>{menu.label}</AccordionTrigger>

            <AccordionContent>
              <div className="grid grid-cols-6 gap-4 text-xs font-semibold px-2 pb-2">
                <div>Feature</div>
                <div className="text-center">All</div>
                <div className="text-center">Create</div>
                <div className="text-center">View</div>
                <div className="text-center">Update</div>
                <div className="text-center">Delete</div>
              </div>

              <Separator />

              <div className="space-y-3 mt-3">
                {menu.submenus.map((sub: any, subIndex: number) => (
                  <div
                    key={sub._id}
                    className="grid grid-cols-6 items-center gap-4 px-2"
                  >
                    <span className="text-sm">{sub.label}</span>

                    {/* Row All */}
                    <div className="flex justify-center">
                      <Switch
                        checked={isRowAllSelected(sub.permissions)}
                        onCheckedChange={(val) =>
                          handleToggleRowAll(parentIndex, subIndex, val)
                        }
                      />
                    </div>

                    {/* Individual */}
                    {ACTIONS.map((action) => (
                      <div key={action} className="flex justify-center">
                        <Switch
                          checked={sub.permissions[action]}
                          onCheckedChange={(val) =>
                            handleToggle(
                              parentIndex,
                              subIndex,
                              action,
                              val
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={updatePermissions.isPending}
        >
          {updatePermissions.isPending ? "Saving..." : "Save Permissions"}
        </Button>
      </div>
    </div>
  );
}