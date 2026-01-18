package com.cooper.callbridge

import android.content.Intent
import android.os.IBinder
import android.telecom.Connection
import android.telecom.ConnectionRequest
import android.telecom.ConnectionService
import android.telecom.PhoneAccountHandle
import android.telecom.TelecomManager.PRESENTATION_ALLOWED
import android.util.Log

class CBConnService : ConnectionService() {

    override fun onCreateOutgoingConnection(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ): Connection? {
        val connection = CBConnection()

        connection.setAddress(request?.address, PRESENTATION_ALLOWED)
        connection.setInitializing()

        connection.setRinging()
        return connection
    }

    override fun onCreateIncomingConnectionFailed(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ) {
        Log.e("INCOMING_CALL", "INCOMING CALL FAILED")
    }
}