package com.cooper.callbridge

import android.app.Activity
import android.app.role.RoleManager
import android.content.ComponentName
import android.content.Context
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.telecom.CallAttributes
import android.telecom.InCallService
import android.telecom.PhoneAccount
import android.telecom.PhoneAccountHandle
import android.telecom.TelecomManager
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat.startActivityForResult
import androidx.core.os.bundleOf
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
    private final val  ROLE_REQ_CODE = 42
    private var _number: String? = ""


  @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
  override fun definition() = ModuleDefinition {

    Name("Callbridge")

      Events("onRoleResult", "onCallStateChanged")

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
          val roleActivity = roleManager.createRequestRoleIntent(RoleManager.ROLE_DIALER)

          startActivityForResult(appContext.currentActivity!!, roleActivity, ROLE_REQ_CODE, null)
      }

      OnActivityResult { activity, payload ->
          if(payload.resultCode == Activity.RESULT_OK){
              this@CallbridgeModule.sendEvent("onRoleResult", bundleOf("granted" to true))
          }
          else{
              this@CallbridgeModule.sendEvent("onRoleResult", bundleOf("granted" to false))
          }
      }

      AsyncFunction("answerCall"){
          CallManager.currentCall.value?.answer(0)
      }

      AsyncFunction("hangUpCall"){
          CallManager.currentCall.value?.disconnect()
      }

      AsyncFunction("simulateCall"){
          val context = appContext.reactContext
          val calLService = context?.getSystemService(Context.TELECOM_SERVICE) as TelecomManager

          val compName = ComponentName(context, CallService::javaClass.javaClass)
          val phoneAccountHandle = PhoneAccountHandle(compName, "AdminAccount")

          val phoneAccount = PhoneAccount.builder(phoneAccountHandle, "Call Simulator")
              .setCapabilities(PhoneAccount.CAPABILITY_SUPPORTS_TRANSACTIONAL_OPERATIONS )
              .build()

          calLService.registerPhoneAccount(phoneAccount)

          val extras = Bundle()
          val uri = Uri.fromParts("tel", "9319376830", null)
          extras.putParcelable(TelecomManager.EXTRA_INCOMING_CALL_ADDRESS, uri)

          calLService.addNewIncomingCall(phoneAccountHandle, extras)
      }
  }
}
