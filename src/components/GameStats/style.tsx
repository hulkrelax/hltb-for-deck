export default (
    <style>
        {`

#hltb-for-deck{
    position: relative;
}

.hltb-info {
    background: rgba(14, 20, 27, 0.25);
    position: relative;
    border-bottom: 2px solid rgba(61, 68, 80, 0.54);
    padding-top: 5px;
}

.hltb-info-clean-default {
    background: rgba(14, 20, 27, 0.5);
    position: absolute;
    border: none;
    padding-top: 5px;
    top: -85px;
    height: 80px;
    width: 100%;
}

.hltb-info-absolute {
    position: absolute;
    display: none;
}

.hltb-info-clean {
    position: absolute;
    /*top: calc(50vh - 40px - 108px);*/
    top: -55vh;
    right: 2.8vw;
    width: fit-content;
    height: fit-content;
    border: none;
}

.hltb-info-clean-left {
    right: 0px;
    left: 2.8vw;
}

.hltb-info ul {
    list-style: none;
    padding: 5px 40px;
    margin: 0px;
    display: flex;
}

.hltb-info-clean ul {
    display: block;
}

.hltb-info ul li {
    width: 25%;
    text-align: center;
}

.hltb-info-clean ul li {
    width: 100%;
}

.hltb-info p {
    margin: 0;
}

.hltb-gametime {
    font-size: 20px;
    font-weight: bold;
}

.hltb-label {
    text-transform: uppercase;
    font-size: 12px;
}
.hltb-details-btn {
    background: transparent !important;
    padding: 0px 2.8vw !important;
    color: #1a9fff !important;
    display: flex !important;
    margin-left: auto !important;
    font-size: 14px !important;
    font-weight: bold !important;
    width: fit-content !important;
    min-width: 0px !important;
    text-transform: uppercase;
    line-height: 14px !important;
}
.hltb-details-btn-clean {
    margin: auto !important;
}

.hltb-details-btn:focus {
    color: white !important;
}
.hltb-details-btn:hover {
    color: white !important;
}
`}
    </style>
);
