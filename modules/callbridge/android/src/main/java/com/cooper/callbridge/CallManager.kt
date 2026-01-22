package com.cooper.callbridge

import android.telecom.Call
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

object CallManager {
    private val _currentCall = MutableStateFlow<Call?>(null)
    private val _number = MutableStateFlow<String?>("")

    val currentCall = _currentCall.asStateFlow()
    val number = _number.asStateFlow()

    fun updateCall(call: Call?){
        _currentCall.value = call

        call?.registerCallback(object: Call.Callback() {
            override fun onStateChanged(call: Call?, state: Int) {
                when(state){
                    Call.STATE_DISCONNECTED -> {
                        _currentCall.value = null
                        call?.unregisterCallback(this)
                    }
                }
            }
        })
    }

    fun updateNumber(number: String?){
        _number.value = number
    }
    fun disconnect(){
        _currentCall.value = null
        currentCall.value?.disconnect()
    }
}