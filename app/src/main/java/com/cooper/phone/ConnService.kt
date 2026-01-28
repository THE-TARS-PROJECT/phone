package com.cooper.phone

import android.telecom.Connection
import android.telecom.Connection.PROPERTY_SELF_MANAGED
import android.telecom.ConnectionRequest
import android.telecom.ConnectionService
import android.telecom.PhoneAccountHandle
import android.telecom.TelecomManager
import android.telecom.TelecomManager.PRESENTATION_ALLOWED
import android.telecom.VideoProfile
import android.util.Log

class ConnService: ConnectionService() {

    override fun onCreateOutgoingConnection(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ): Connection {

        val connection = Conn()

        connection.apply {
            setInitializing()
            setAddress(request?.address, PRESENTATION_ALLOWED)
            setCallerDisplayName(
                request?.extras?.getString(TelecomManager.EXTRA_OUTGOING_CALL_EXTRAS),
                PRESENTATION_ALLOWED
            )
            setConnectionProperties(PROPERTY_SELF_MANAGED)
            setConnectionCapabilities(Connection.CAPABILITY_HOLD or Connection.CAPABILITY_SUPPORT_HOLD)
            setVideoState(VideoProfile.STATE_AUDIO_ONLY)
        }

        return connection
    }

    override fun onCreateOutgoingConnectionFailed(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ) {
        super.onCreateOutgoingConnectionFailed(connectionManagerPhoneAccount, request)
        Log.e("Connection Service", "failed to make outgoing call")
    }

    override fun onCreateIncomingConnection(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ): Connection {

        val connection = Conn()

        connection.apply {
            setConnectionProperties(PROPERTY_SELF_MANAGED)
            setConnectionCapabilities(Connection.CAPABILITY_HOLD or Connection.CAPABILITY_SUPPORT_HOLD)
            setCallerDisplayName(
                request?.address?.schemeSpecificPart,
                PRESENTATION_ALLOWED
            )

            connection.setAddress(
                request?.address,
                PRESENTATION_ALLOWED
            )

            setRinging()
        }

        return connection
    }

    override fun onCreateIncomingConnectionFailed(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ) {
        Log.e("Connection Service", "incoming call failed")
    }
}