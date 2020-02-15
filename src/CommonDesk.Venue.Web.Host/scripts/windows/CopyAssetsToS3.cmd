rem This script requires you to have installed and configured the AWS command line tools
rem You can download it here: https://aws.amazon.com/cli/?sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=google&sc_medium=ACQ-P%7CPS-ACQ-P%7CPS-GO%7CBrand%7CSU%7CManagement%20Tools%7CCommand%20Line%7CUS%7CEN%7CText&sc_content=aws_cli_tool_e&sc_detail=aws%20cli%20tool&sc_category=command_line&sc_segment=279493452422&sc_matchtype=e&sc_country=US&s_kwcid=AL!4422!3!279493452422!e!!g!!aws%20cli%20tool&ef_id=WGasfgAABN6zEQxW:20180718194409:s
rem Use `aws configure` to configure it.
rem Also please note you need to build the solution and have included ALL the files in the project (not just moved them into the right directory) for this to work.
aws s3 sync ./bin/Debug/staticfiles/ s3://venue-static-files/staticfiles/ --delete --acl public-read
