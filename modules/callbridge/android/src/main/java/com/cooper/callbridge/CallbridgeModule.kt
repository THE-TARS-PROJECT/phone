package com.cooper.callbridge

import android.app.role.RoleManager
import android.content.Context
import android.os.Build
import androidx.annotation.RequiresApi
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class CallbridgeModule : Module() {

  @RequiresApi(Build.VERSION_CODES.Q)
  override fun definition() = ModuleDefinition {

    Name("Callbridge")

      AsyncFunction("isRoleHeld"){
          val context = appContext.reactContext
          val roleManager = context?.getSystemService(Context.ROLE_SERVICE) as RoleManager
          var result = false;

          if(roleManager.isRoleAvailable(RoleManager.ROLE_DIALER)){
              if(roleManager.isRoleHeld(RoleManager.ROLE_DIALER)){
                  result = true;
              }
          }
          return@AsyncFunction result
      }
  }
}
