"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var midi_file_1 = require("../../../midi-file");
var Header_1 = require("./Header");
// tslint:disable-next-line: no-var-requires
var flatten = require("array-flatten");
function encodeNote(note, channel) {
    return [{
            absoluteTime: note.ticks,
            channel: channel,
            deltaTime: 0,
            noteNumber: note.midi,
            type: "noteOn",
            velocity: Math.floor(note.velocity * 127),
        },
        {
            absoluteTime: note.ticks + note.durationTicks,
            channel: channel,
            deltaTime: 0,
            noteNumber: note.midi,
            type: "noteOff",
            velocity: Math.floor(note.noteOffVelocity * 127),
        }];
}
function encodeNotes(track) {
    return flatten(track.notes.map(function (note) { return encodeNote(note, track.channel); }));
}
function encodeControlChange(cc, channel) {
    return {
        absoluteTime: cc.ticks,
        channel: channel,
        controllerType: cc.number,
        deltaTime: 0,
        type: "controller",
        value: cc.value,
    };
}
function encodeControlChanges(track) {
    var controlChanges = [];
    for (var i = 0; i < 127; i++) {
        if (track.controlChanges.hasOwnProperty(i)) {
            track.controlChanges[i].forEach(function (cc) {
                controlChanges.push(encodeControlChange(cc, track.channel));
            });
        }
    }
    return controlChanges;
}
function encodeInstrument(track) {
    return {
        absoluteTime: 0,
        channel: track.channel,
        deltaTime: 0,
        programNumber: track.instrument.number,
        type: "programChange",
    };
}
function encodeTrackName(name) {
    return {
        absoluteTime: 0,
        deltaTime: 0,
        meta: true,
        text: name,
        type: "trackName",
    };
}
function encodeTempo(tempo) {
    return {
        absoluteTime: tempo.ticks,
        deltaTime: 0,
        meta: true,
        microsecondsPerBeat: Math.floor(60000000 / tempo.bpm),
        type: "setTempo",
    };
}
function encodeTimeSignature(timeSig) {
    return {
        absoluteTime: timeSig.ticks,
        deltaTime: 0,
        denominator: timeSig.timeSignature[1],
        meta: true,
        metronome: 24,
        numerator: timeSig.timeSignature[0],
        thirtyseconds: 8,
        type: "timeSignature",
    };
}
// function encodeMeta(event: )
function encodeKeySignature(keySig) {
    var keyIndex = Header_1.keySignatureKeys.indexOf(keySig.key);
    return {
        absoluteTime: keySig.ticks,
        deltaTime: 0,
        key: keyIndex + 7,
        meta: true,
        scale: keySig.scale === "major" ? 0 : 1,
        type: "keySignature",
    };
}
function encodeText(textEvent) {
    return {
        absoluteTime: textEvent.ticks,
        deltaTime: 0,
        meta: true,
        text: textEvent.text,
        type: textEvent.type,
    };
}
/**
 * Convert the midi object to an array
 */
function encode(midi) {
    var midiData = {
        header: {
            format: 1,
            numTracks: midi.tracks.length + 1,
            ticksPerBeat: midi.header.ppq,
        },
        tracks: [
            [
                // the name data
                {
                    absoluteTime: 0,
                    deltaTime: 0,
                    meta: true,
                    text: midi.header.name,
                    type: "trackName",
                }
            ].concat(midi.header.keySignatures.map(function (keySig) { return encodeKeySignature(keySig); }), midi.header.meta.map(function (e) { return encodeText(e); }), midi.header.tempos.map(function (tempo) { return encodeTempo(tempo); }), midi.header.timeSignatures.map(function (timeSig) { return encodeTimeSignature(timeSig); }))
        ].concat(midi.tracks.map(function (track) {
            return [
                // add the name
                encodeTrackName(track.name),
                // the instrument
                encodeInstrument(track)
            ].concat(encodeNotes(track), encodeControlChanges(track));
        })),
    };
    // sort and set deltaTime of all of the tracks
    midiData.tracks = midiData.tracks.map(function (track) {
        track = track.sort(function (a, b) { return a.absoluteTime - b.absoluteTime; });
        var lastTime = 0;
        track.forEach(function (note) {
            note.deltaTime = note.absoluteTime - lastTime;
            lastTime = note.absoluteTime;
            delete note.absoluteTime;
        });
        // end of track
        track.push({
            deltaTime: 0,
            meta: true,
            type: "endOfTrack",
        });
        return track;
    });
    // return midiData
    return new Uint8Array(midi_file_1.writeMidi(midiData));
}
exports.encode = encode;
//# sourceMappingURL=Encode.js.map