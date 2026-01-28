package com.cooper.phone

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Call
import androidx.compose.material.icons.rounded.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ModifierLocalBeyondBoundsLayout
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Preview
@Composable
fun InCallInterface(){
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(50.dp)
    ){
        // top view will contain name, number and photo
        Column(
            modifier = Modifier
                .fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally,
        ){
            androidx.compose.material3.Icon(
                imageVector = Icons.Rounded.Person,
                modifier = Modifier
                    .size(120.dp),
                contentDescription = "person"
            )

            Text(
                text = "Unknown",
                fontSize = 28.sp
            )

            Text(
                text = "+91 9582576830",
                fontSize = 18.sp
            )
        }
    }
}