package com.cooper.phone

import android.telecom.CallAudioState
import android.telecom.Connection
import android.telecom.DisconnectCause
import android.telecom.TelecomManager.PRESENTATION_ALLOWED
import android.telecom.VideoProfile.STATE_AUDIO_ONLY
import android.util.Log

class Conn: Connection() {

    init {
        setAddress(address, PRESENTATION_ALLOWED)
        videoState = STATE_AUDIO_ONLY
    }

    override fun onShowIncomingCallUi() {
        super.onShowIncomingCallUi()
        Log.d("CONN", "incoming call")
    }

    @Deprecated("Deprecated in Java")
    override fun onCallAudioStateChanged(state: CallAudioState?) {
        super.onCallAudioStateChanged(state)
        Log.d("CONN", "audio state changed")
    }

    override fun onHold() {
        super.onHold()
        Log.d("CONN", "call put on hold")
    }

    override fun onUnhold() {
        super.onUnhold()
        Log.d("CONN", "call unholded")
    }

    override fun onAnswer() {
        super.onAnswer()
        setActive()
        Log.d("CONN", "call answered")
    }

    override fun onReject() {
        super.onReject()
        Log.d("CONN", "call answered")
    }

    override fun onDisconnect() {
        super.onDisconnect()
        Log.d("CONN", "call disconnected")
    }
}