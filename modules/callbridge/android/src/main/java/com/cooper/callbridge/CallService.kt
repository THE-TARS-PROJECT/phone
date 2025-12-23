package com.cooper.callbridge

import android.telecom.Call
import android.telecom.InCallService


class CallService : InCallService() {

    override fun onCallAdded(call: Call?) {
        super.onCallAdded(call)
        CallManager.updateCall(call)
    }

    override fun onCallRemoved(call: Call?) {
        super.onCallRemoved(call)
        CallManager.updateCall(null)
    }
}