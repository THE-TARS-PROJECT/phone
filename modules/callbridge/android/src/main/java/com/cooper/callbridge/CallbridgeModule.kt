package com.cooper.callbridge

import android.app.Activity
import android.app.role.RoleManager
import android.content.Context
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat.startActivityForResult
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

class CallbridgeModule : Module() {
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private val ROLE_REQ_CODE = 42
    private var _number: String? = ""

  @RequiresApi(Build.VERSION_CODES.Q)
  override fun definition() = ModuleDefinition {

    Name("Callbridge")

      Property("_number").get { return@get _number }.set { newNum: String? ->{ _number = newNum } }

      OnCreate {
          scope.launch {
              CallManager.currentCall.collectLatest { call ->
                  if(call != null){
                      val number = call.details.handle?.schemeSpecificPart ?: "Unknown"
                      sendEvent("onCallStateChanged", mapOf("number" to number, "isActive" to true))
                  }
                  else{
                      sendEvent("onCallStateChanged", mapOf("isActive" to false))
                  }
              }

              CallManager.number.collectLatest { number ->
                  _number = number
              }
          }
      }

      OnDestroy {
          scope.cancel()
      }

      // check if role is held
      AsyncFunction("isRoleHeld"){
          val context = appContext.reactContext
          val roleManager = context?.getSystemService(Context.ROLE_SERVICE) as RoleManager
          var result = false

          if(roleManager.isRoleAvailable(RoleManager.ROLE_DIALER)){
              if(roleManager.isRoleHeld(RoleManager.ROLE_DIALER)){
                  result = true
              }
          }
          return@AsyncFunction result
      }

      // request role
      AsyncFunction("requestRole") {
          val context = appContext.reactContext
          val roleManager = context?.getSystemService(Context.ROLE_SERVICE) as RoleManager
          val roleActivity = roleManager.createRequestRoleIntent(Context.ROLE_SERVICE)

          startActivityForResult(appContext.currentActivity!!, roleActivity, ROLE_REQ_CODE, null)
      }

      AsyncFunction("answerCall"){
          CallManager.currentCall.value?.answer(0)
      }

      AsyncFunction("hangUpCall"){
          CallManager.currentCall.value?.disconnect()
      }

      OnActivityResult { activity, payload ->
          if(payload.resultCode == Activity.RESULT_OK){
              this@CallbridgeModule.sendEvent("onRoleResult", mapOf("granted" to true))
          }
          else{
              this@CallbridgeModule.sendEvent("onRoleResult", mapOf("granted" to false))
          }
      }

      Events("onRoleResult")
      Events("onCallStateChanged")
  }
}
