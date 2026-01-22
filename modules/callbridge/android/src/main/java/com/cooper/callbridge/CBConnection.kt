package com.cooper.callbridge

import android.telecom.Connection
import android.telecom.DisconnectCause
import android.telecom.TelecomManager.PRESENTATION_ALLOWED
import android.telecom.VideoProfile.STATE_AUDIO_ONLY
import android.util.Log
class CBConnection: Connection() {

    init {
        setAddress(address, PRESENTATION_ALLOWED)
        videoState = STATE_AUDIO_ONLY
    }

    override fun onShowIncomingCallUi() {
        super.onShowIncomingCallUi()
    }

    override fun onAnswer() {
        setActive()
    }

    override fun onReject() {
        setDisconnected(DisconnectCause(DisconnectCause.REJECTED))
        CallManager.updateCall(null)
        CallManager.updateNumber(null)
        destroy()
    }

    override fun onDisconnect() {
        Log.d("connection", "Call disconnected")
        setDisconnected(DisconnectCause(DisconnectCause.LOCAL))
        destroy()
        CallManager.updateCall(null)
        CallManager.updateNumber(null)
    }

}