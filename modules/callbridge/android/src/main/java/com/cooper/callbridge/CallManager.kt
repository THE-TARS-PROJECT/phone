package com.cooper.callbridge

import android.telecom.Call
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.MutableStateFlow

object CallManager {
    private val _currentCall = MutableStateFlow<Call?>(null)
    private val _number = MutableStateFlow<String?>("")

    val currentCall = _currentCall.asStateFlow()
    val number = _number.asStateFlow()

    fun updateCall(call: Call?){
        _currentCall.value = call
    }

    fun updateNumber(number: String?){
        _number.value = number
    }
}