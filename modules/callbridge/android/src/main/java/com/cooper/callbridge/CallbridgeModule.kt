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
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.annotation.RequiresPermission
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
    private var isPaRegsitered = false
    private var _number: String? = ""


  @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
  override fun definition() = ModuleDefinition {

    Name("Callbridge")

      Events("onRoleResult", "onCallStateChanged")
      Property("_number")
          .get { return@get _number }
          .set { newNum: String? ->{ _number = newNum } }

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

      AsyncFunction("registerPa"){
          if(!isPaRegsitered){
              val context = appContext.reactContext
              if(context == null){
                  Log.e("context", "react context is null")
                  return@AsyncFunction null
              }

              val telecomManager = context.getSystemService(Context.TELECOM_SERVICE) as TelecomManager
              val handle = PhoneAccountHandle(ComponentName(context, CBConnService::class.java), "cdialer")
              val account = PhoneAccount.builder(handle, "cdialer")
                  .setCapabilities(PhoneAccount.CAPABILITY_CALL_PROVIDER)
                  .build()

              telecomManager.registerPhoneAccount(account)
              isPaRegsitered = true
              return@AsyncFunction true
          }

          else{
              return@AsyncFunction false
          }
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

      @RequiresPermission(anyOf = [android.Manifest.permission.CALL_PHONE, android.Manifest.permission.MANAGE_OWN_CALLS])
      fun placeCall(number: String): Boolean? {
          val context = appContext.reactContext
          if(context == null){
              Log.e("Context", "react context is null")
              return null
          }

          val telecomManager = context.getSystemService(Context.TELECOM_SERVICE) as TelecomManager
          val uri = Uri.fromParts("tel", number.toString(), null);
          val bundle = Bundle()

          val handle = PhoneAccountHandle(
              ComponentName(context, CBConnService::class.java),
              "cdialer"
          )

          bundle.putBoolean(TelecomManager.EXTRA_START_CALL_WITH_SPEAKERPHONE, true)
          bundle.putParcelable(TelecomManager.EXTRA_PHONE_ACCOUNT_HANDLE, handle)

          if(telecomManager.isOutgoingCallPermitted(handle)){
              try{
                  telecomManager.placeCall(uri, bundle)
                  return true
              }

              catch(e: SecurityException){
                  Log.e("security", "failed to place call")
                  Log.e("security", e.toString())
                  return false
              }
          }
          else{
              return false
          }
      }

      AsyncFunction("placeCall") { number: String ->
          val status = placeCall(number)
          return@AsyncFunction status
      }

      AsyncFunction("endCall"){
          val context = appContext.reactContext
          if(context == null){
              Log.e("context", "react context is null")
              return@AsyncFunction null ;
          }

          try{
              CallManager.disconnect()
              Log.e("call", "call disconnected")
              return@AsyncFunction true
          }

          catch (e: Exception){
              Log.e("call", e.toString())
              return@AsyncFunction false
          }
      }
  }
}
